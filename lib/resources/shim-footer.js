/* jshint browser: true */
(function (window) {
    if (!window.ELECTRON) {
        return;
    }

    // Restore Electron variables.
    window.process = window.processNode;

    // Redefine a global `require` function that can satisfy both
    // Node and AMD module systems.
    var requireAMD = window.require;
    var requireNode = window.requireNode;

    if (requireAMD) {
        window.require = function () {
            try {
                return requireAMD.apply(null, arguments);
            } catch (e) {
                if (e.toString().includes('Error: Could not find module')) {
                    return requireNode.apply(null, arguments);
                } else {
                    return console.error(e);
                }
            }
        };
    } else {
        window.require = requireNode;
    }
})(this);
