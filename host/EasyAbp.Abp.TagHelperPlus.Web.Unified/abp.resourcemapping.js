module.exports = {
    aliases: {
        "@node_modules": "./node_modules",
        "@libs": "./wwwroot/libs"
    },
    clean: [
        "@libs"
    ],
    mappings: {
        // this not using, can be remove
        "@node_modules/select2-bootstrap-5-theme/dist/*.*": "./wwwroot/libs/select2-bootstrap-5-theme/dist"
    }
}