//
// Mobile helper
//\
class Mobile
{
    android()
    {
        return navigator.userAgent.match(/Android/i);
    }

    blackberry()
    {
        return navigator.userAgent.match(/BlackBerry/i);
    }

    ios()
    {
        return navigator.userAgent.match(/iPhone|iPod/i);
    }

    opera()
    {
        return navigator.userAgent.match(/Opera Mini/i);
    }

    windows()
    {
        return navigator.userAgent.match(/IEMobile/i);
    }

    any()
    {
        return this.android()||this.blackberry()||this.ios()||this.opera()||this.windows();
    }
};
export default Mobile;
