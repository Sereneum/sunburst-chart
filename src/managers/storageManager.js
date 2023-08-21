export const storageManager = {
    chartData: {
        key: 'chart-data',
        save: function (d = null) {
            localStorage.setItem(this.key, JSON.stringify(d))
        },
        clear: function () {
            localStorage.setItem(this.key, null)
        },
        get: function () {
            return JSON.parse(localStorage.getItem(this.key))
        },
    },
    customRadius: {
        key: 'custom-radius',
        save: function (d) {
            localStorage.setItem(this.key, JSON.stringify(d))
        },
        get: function () {
            return JSON.parse(localStorage.getItem(this.key))
        },
        clear: function () {
            localStorage.setItem(this.key, null)
        }
    },
    colorScheme: {
        key: 'color-scheme',
        save: function (d) {
            localStorage.setItem(this.key, JSON.stringify(d))
        },
        get: function () {
            return JSON.parse(localStorage.getItem(this.key))
        },
        clear: function () {
            localStorage.setItem(this.key, null)
        }
    }
}
