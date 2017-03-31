export const diContext: any = {};

export function diInject(): any {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                const bean = diContext[propertyKey];
                if (bean) {
                    return bean;
                } else if (process.env.NODE_ENV === 'development') {
                    console.error(`Context has no bean with name ${propertyKey}. 
                    Available beans: ${Object.getOwnPropertyNames(diContext).join(', ')}`);
                }
            },
            set() {
                throw new Error('Not allowed');
            },
            enumerable: true,
            configurable: true
        });
    };
};