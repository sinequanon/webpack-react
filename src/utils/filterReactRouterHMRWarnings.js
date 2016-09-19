/* eslint no-console: 0*/
/**
 * HACK!
 * React hot loader now supports hot loading of stateless functions as well as
 * normal react components.
 * (See https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
 * for a rundown on stateless functions.)
 *
 * The downside to this is that react-router will issue warnings whenever it
 * is hot-loaded because of how its routes are issued. These warnings can be
 * safely ignored, but they are annoying and can quickly fill up your console.
 *
 * This utility works by redefining the console.error function and filtering
 * those specific warnings and allowing everything else through normally. The
 * react-router issue most likely won't be fixed until we move to react-router
 * v4.
 *
 * Note that if you use the babel-preset-react-hmre plugin instead of the react
 * hot loader, you won't see these warnings at all. But then you lose the
 * ability to hot load stateless functions.
 *
 * See https://github.com/reactjs/react-router/issues/2182 for more context on
 * the react-router issue.
 *
 */
export default () => {
    console.error = (() => {
        const error = console.error;
        return (...exceptions) => {
            // Array.some immediately returns if something truthy is found.
            const shouldFilterRouterException = exceptions.some(exception => (
                !!(exception && typeof exception === 'string' && exception.match(/change <Router /))
            ));
            return shouldFilterRouterException ? undefined : error.apply(console, ...exceptions);
        };
    })();
};
