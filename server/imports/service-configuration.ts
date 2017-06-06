import { ServiceConfiguration } from 'meteor/service-configuration';

export function startServiceConfiguration() : void {

    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.remove({
        service: 'twitter'
    });

    ServiceConfiguration.configurations.remove({
        service: 'google'
    });

    ServiceConfiguration.configurations.remove({
        service: 'instagram'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '387943488251569',
        secret: 'f20da6c4f3dd3cf09ae3c8a313fe4de0'
    });

    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: 'cGcREYLEkmd8FV9Gz5HvR0rQd',
        secret: 'qOe9vhWnlfz6qJDm2BB6q2xa3SFIcHXKTv6q6nGLWmi9EXlbc0'
    });

    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '963545687850-0ufu3t53oa076d39u5jsvrkg8hsh0r5b.apps.googleusercontent.com',
        secret: 'GOdLtaPmGsTvbXMbLHkbC0VX'
    });

    ServiceConfiguration.configurations.insert({
        service: 'instagram',
        clientId: '084cd11383664a8ba7726d7ba6797554',
        secret: 'df55d3d15c9f440994086d2ecc2668ad'
    });

}
