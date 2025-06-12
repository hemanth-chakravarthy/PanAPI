/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/company/Business_details`; params?: Router.UnknownInputParams; } | { pathname: `/company/GSTVerfication`; params?: Router.UnknownInputParams; } | { pathname: `/company/PANVerification`; params?: Router.UnknownInputParams; } | { pathname: `/types/react-native-check-box.d`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/company/Business_details`; params?: Router.UnknownOutputParams; } | { pathname: `/company/GSTVerfication`; params?: Router.UnknownOutputParams; } | { pathname: `/company/PANVerification`; params?: Router.UnknownOutputParams; } | { pathname: `/types/react-native-check-box.d`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/company/Business_details${`?${string}` | `#${string}` | ''}` | `/company/GSTVerfication${`?${string}` | `#${string}` | ''}` | `/company/PANVerification${`?${string}` | `#${string}` | ''}` | `/types/react-native-check-box.d${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/company/Business_details`; params?: Router.UnknownInputParams; } | { pathname: `/company/GSTVerfication`; params?: Router.UnknownInputParams; } | { pathname: `/company/PANVerification`; params?: Router.UnknownInputParams; } | { pathname: `/types/react-native-check-box.d`; params?: Router.UnknownInputParams; };
    }
  }
}
