﻿define(['logger', './dataservice'], function (logger, dataservice) {

    var suspendItemSave = false;

    var vm = {
        newTodo: ko.observable(""),
        items: ko.observableArray(),
        includeArchived: ko.observable(false),
        addItem: addItem,
        edit: edit,
        completeEdit: completeEdit,
        removeItem: removeItem,
        archiveCompletedItems: archiveCompletedItems,
        purge: purge,
        reset: reset,
        activate: activate
    };

    //initVm();

    return vm; // done with setup; return module variable

    function activate() {
    	//system.log('Lifecycle : activate : hello');
	    initVm();
    }

    //#region private functions
    function initVm() {
        vm.includeArchived.subscribe(getAllTodos);
        addComputeds();
        getAllTodos();
    }
    function addComputeds() {
        vm.archiveCompletedMessage = ko.computed(function () {
            var count = getStateOfItems().itemsDoneCount;
            if (count > 0) {
                return "Archive " + count + " completed item" + (count > 1 ? "s" : "");
            }
            return null;
        });

        vm.itemsLeftMessage = ko.computed(function () {
            var count = getStateOfItems().itemsLeftCount;
            if (count > 0) {
                return count + " item" + (count > 1 ? "s" : "") + " left";
            }
            return null;
        });

        vm.markAllCompleted = ko.computed({
            read: function () {
                var state = getStateOfItems();
                return state.itemsLeftCount === 0 && vm.items().length > 0;
            },
            write: function (value) {
                suspendItemSave = true;
                vm.items().forEach(function (item) {
                    item.IsDone(value);
                });
                suspendItemSave = false;
                dataservice.saveChanges();
            }
        });
    }
    function getAllTodos() {
        dataservice.getAllTodos(vm.includeArchived())
            .then(querySucceeded)
            .fail(queryFailed);
    }
    function querySucceeded(data) {
        vm.items([]);
        data.results.forEach(function (item) {
            extendItem(item);
            vm.items.push(item);
        });
        logger.info("Fetched Todos " +
            (vm.includeArchived() ? "including archived" : "excluding archived"));
    }
    function queryFailed(error) {
        logger.error(error.message, "Query failed");
    }
    function addItem() {
        var item = dataservice.createTodo({
            Description: vm.newTodo(),
            CreatedAt: new Date(),
            IsDone: vm.markAllCompleted()
        });

        dataservice.saveChanges().fail(addFailed);
        extendItem(item);
        vm.items.push(item);
        vm.newTodo("");

        function addFailed() {
            var index = vm.items.indexOf(item);
            if (index > -1) {
                setTimeout(function () { vm.items.splice(index, 1); }, 2000);
            }
        }
    }
    function extendItem(item) {
        if (item.isEditing) return; // already extended

        item.isEditing = ko.observable(false);

        // listen for changes with Breeze PropertyChanged event
        item.entityAspect.propertyChanged.subscribe(function () {
            if (suspendItemSave) { return; }
            // give EntityManager time to hear the change
            setTimeout(saveIfModified, 0);

            function saveIfModified() {
                if (item.entityAspect.entityState.isModified()) {
                    dataservice.saveChanges();
                }
            }
        });
    }

    function edit(item) {
        if (item) { item.isEditing(true); }
    }
    function completeEdit(item) {
        if (item) { item.isEditing(false); }
    }
    function removeItem(item) {
        vm.items.remove(item);
        item.entityAspect.setDeleted();
        dataservice.saveChanges();
    }
    function archiveCompletedItems() {
        var state = getStateOfItems();
        suspendItemSave = true;
        state.itemsDone.forEach(function (item) {
            if (!vm.includeArchived()) {
                vm.items.remove(item);
            }
            item.IsArchived(true);
        });
        suspendItemSave = false;
        dataservice.saveChanges();
    }
    function getStateOfItems() {
        var itemsDone = [], itemsLeft = [];

        vm.items().forEach(function (item) {
            if (item.IsDone()) {
                if (!item.IsArchived()) {
                    itemsDone.push(item); // only unarchived items                
                }
            } else {
                itemsLeft.push(item);
            }
        });

        return {
            itemsDone: itemsDone,
            itemsDoneCount: itemsDone.length,
            itemsLeft: itemsLeft,
            itemsLeftCount: itemsLeft.length
        };
    }
    function purge() {
        return dataservice.purge(getAllTodos);
    }
    function reset() {
        return dataservice.reset(getAllTodos);
    }
    //#endregion    

});