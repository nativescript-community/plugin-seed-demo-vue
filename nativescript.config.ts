import { NativeScriptConfig } from '@nativescript/core';

export default {
    id: 'org.nativescript.demovue',
    appPath: 'app',
    appResourcesPath: 'App_Resources',
    android: {
        gradleVersion: '8.10.2',
        v8Flags: '--expose_gc',
        markingMode: 'none'
    }
} as NativeScriptConfig;
