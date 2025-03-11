/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/Feeding`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/mental-health`; params?: Router.UnknownInputParams; } | { pathname: `/milestones`; params?: Router.UnknownInputParams; } | { pathname: `/newborn-care`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/Feeding`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/mental-health`; params?: Router.UnknownOutputParams; } | { pathname: `/milestones`; params?: Router.UnknownOutputParams; } | { pathname: `/newborn-care`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/Feeding${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/mental-health${`?${string}` | `#${string}` | ''}` | `/milestones${`?${string}` | `#${string}` | ''}` | `/newborn-care${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/Feeding`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/mental-health`; params?: Router.UnknownInputParams; } | { pathname: `/milestones`; params?: Router.UnknownInputParams; } | { pathname: `/newborn-care`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
