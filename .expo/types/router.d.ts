/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Business_details/BankVerificationBusiness`; params?: Router.UnknownInputParams; } | { pathname: `/company/BankVerification`; params?: Router.UnknownInputParams; } | { pathname: `/seller_login`; params?: Router.UnknownInputParams; } | { pathname: `/seller_login/register`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/Business_details/BankVerificationBusiness`; params?: Router.UnknownOutputParams; } | { pathname: `/company/BankVerification`; params?: Router.UnknownOutputParams; } | { pathname: `/seller_login`; params?: Router.UnknownOutputParams; } | { pathname: `/seller_login/register`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/Business_details/BankVerificationBusiness${`?${string}` | `#${string}` | ''}` | `/company/BankVerification${`?${string}` | `#${string}` | ''}` | `/seller_login${`?${string}` | `#${string}` | ''}` | `/seller_login/register${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Business_details/BankVerificationBusiness`; params?: Router.UnknownInputParams; } | { pathname: `/company/BankVerification`; params?: Router.UnknownInputParams; } | { pathname: `/seller_login`; params?: Router.UnknownInputParams; } | { pathname: `/seller_login/register`; params?: Router.UnknownInputParams; };
    }
  }
}
