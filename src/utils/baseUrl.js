let getBaseUrl = (env) => {
    let base = {
        development: 'http://172.16.80.47:8080/',
        test: (window.location.protocol + "//" + window.location.host),
        production: (window.location.protocol + "//" + window.location.host),
    }[env];
    if (!base) {
        base = '/';
    }
    return base;
};
export default getBaseUrl