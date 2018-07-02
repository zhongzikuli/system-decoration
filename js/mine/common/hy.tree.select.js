(function ($) {
    var TreeSelector = function (id, data, rootId) {
        this._data = data;
        this._item = id;
        this._rootId = rootId;
    }

    TreeSelector.prototype.createTree = function (callback) {
        $(this._item).empty();
        var options = "";
        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            if (this._data[i].pid == this._rootId) {
                options += "<option value='" + this._data[i].id + "'>" + ".." + this._data[i].text + "</option>";
                $(this._item).append(options);
                for (var j = 0; j < len; j++) {
                    this.createSubOption(len, this._data[i], this._data[j]);
                }
            }
        }

        callback();
    }

    TreeSelector.prototype.createSubOption = function (len, current, next) {
        var options = "";
        var blank = "..";
        if (next.pid == current.id) {
            intLevel = 0;
            var intlvl = this.getLevel(this._data, this._rootId, current);
            for (a = 0; a < intlvl; a++)
                blank += "..";
            blank += "├-";
            options += "<option value='" + next.id + "'>" + blank + next.text + "</option>";
            $(this._item).append(options);
            for (var j = 0; j < len; j++) {
                this.createSubOption(len, next, this._data[j]);
            }
        }
    }
    TreeSelector.prototype.getLevel = function (datasources, topId, currentitem) {
        var pid = currentitem.pid;
        if (pid != topId) {
            for (var i = 0; i < datasources.length; i++) {
                if (datasources[i].id == pid) {
                    intLevel++;
                    this.getLevel(datasources, topId, datasources[i]);
                }
            }
        }
        return intLevel;
    }
    HYCarFinance.treeSelector = TreeSelector;
})($);