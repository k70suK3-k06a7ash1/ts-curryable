var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function curryable(fn) {
    return function curried() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= fn.length) {
            return fn.apply(void 0, args);
        }
        return function () {
            var nextArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                nextArgs[_i] = arguments[_i];
            }
            return curried.apply(void 0, __spreadArray(__spreadArray([], args, false), nextArgs, false));
        };
    };
}
