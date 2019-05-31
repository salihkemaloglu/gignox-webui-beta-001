

export function SetExpireTimeToLocationStorage(key_: string, expireTime_: number) {

    var expiration = new Date(Date.now());
    expiration.setMinutes(expiration.getMinutes() + expireTime_);

    if (Date.now() > expiration.getTime()) {
        localStorage.removeItem(key_);
        return true;
    } else {
        return false;
    }

}