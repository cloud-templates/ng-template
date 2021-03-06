/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */
import template from '@views/home.html';

export default function Route($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: template,
      controller: 'controller',
      // 使用vm而不是使用$scope去操作视图
      controllerAs: 'vm'
    });
}

Route.$inject = ['$stateProvider'];
