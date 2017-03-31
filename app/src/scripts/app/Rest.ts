import RxRest, {jsonInterceptor, errorInterceptor} from 'ts-rx-rest';

export const Rest = new RxRest()
    .wrapRequest(r => {
        r.withCredentials = process.env.NODE_ENV === 'development';
        return r;
    })
    .wrap(errorInterceptor)
    .wrap(jsonInterceptor);