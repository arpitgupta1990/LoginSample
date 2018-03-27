export const validateEmail = (email) => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email && filter.test(email)) {
        return true;
    }
    return false;
};
