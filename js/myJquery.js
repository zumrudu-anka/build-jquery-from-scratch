
const setCollectionProperties = collection => {
    collection.css = (...cssArgs) => {
        if(typeof cssArgs[0] === "string"){
            const [property, value] = cssArgs;
            collection.forEach(element => {
                element.style[property] = value;
            });
        }
        else if(typeof cssArgs[0] === "object"){
            const cssProps = Object.entries(cssArgs[0]);
            collection.forEach(element => {
                cssProps.forEach(([property, value]) => {
                    element.style[property] = value;
                });
            });
        }
    };

    collection.on = (...eventArgs) => {
        if(typeof eventArgs[0] === "string"){
            const eventType = eventArgs[0];
            const eventFunc = eventArgs[1];
            collection.forEach(element => {
                element.addEventListener(eventType, eventFunc);
            })
        }
    };

    collection.each = (callback) => {
        collection.forEach((element, index) => {
            const boundFunction = callback.bind(element);
            boundFunction(index, element);
        });
    }
}

const $ = (...args) => {
    if(typeof args[0] === 'function'){
        // document ready listener
        const readyFn = args[0];
        document.addEventListener('DOMContentLoaded', readyFn);
    }
    else if(typeof args[0] === 'string'){
        // select an element!
        const selector = args[0];
        const collection = document.querySelectorAll(selector);
        setCollectionProperties(collection);

        return collection;
    }
    else if(args[0] instanceof HTMLElement){
        const collection = [args[0]];
        setCollectionProperties(collection);
        return collection;
    }
};