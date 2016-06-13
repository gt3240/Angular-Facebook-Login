(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$fbService', FbServiceFactory);

    FbServiceFactory.$inject = ['$baseService', '$sabio'];

    function FbServiceFactory($baseService, $sabio) {

        var svc = this;
        svc = $baseService.merge(true, {}, svc, $baseService);

        svc.init = _init;
        svc.checkLoginStatus = _checkLoginStatus;
        svc.getUserInfo = _getUserInfo;

        function _init() {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '/* YOUR FACEBOOK APPID HERE */',
                    xfbml: true,
                    version: 'v2.6'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        function _checkLoginStatus(success) {
            FB.login(function (response) {
                //svc.statusChangeCallback(response);
                success(response);
            },{scope: 'public_profile,email'});
        };

        function _getUserInfo(success) {

            var payload = {};

            console.log('Welcome!  Fetching your information.... ');

            FB.api('/me?fields=email,first_name,last_name', function (response) {

                console.log('Successful login for: ', JSON.stringify(response));

                payload.email = response.email;
                payload.id = response.id;
                payload.firstName = response.first_name;
                payload.lastName = response.last_name;
                payload.type = "Facebook";

                success(payload);
            });
        }

        return svc;
    }
})();