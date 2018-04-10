import Homepage from './Homepage';
import Demo_Module from './modules/Demo_Module';
import Demo_Module_Form from './modules/Demo_Module_Form';

const DEFAULT_ROUTES = [
  {
    name: 'Home',
    path: '',
    content: Homepage,
    order: 'first',
  },
  {
    name: 'Party demo',
    path: 'party-demo',
    content: Demo_Module,
  },
  {
    path: 'party-demo-form/:id',
    content: Demo_Module_Form,
  }
]

class RoutesCreator {
  constructor(pages) {
    this.routesAndLinks = [...DEFAULT_ROUTES];
    this.constructRoutes(pages);
  }

  constructRoutes(pages) {
    pages.forEach(item => {
      const {
        name,
        path,
        content
      } = item;

      this.routesAndLinks.push({
        name,
        path,
        content
      });
    });

    this.reorderRoutes();
  }

  reorderRoutes() {
    this.routesAndLinks.forEach((page, idx) => {
      if (page.hasOwnProperty('order')) {
        let where;

        if (page.order === 'first') {
          where = 0;
        } else if (page.order === 'last') {
          where = this.routesAndLinks.length - 1;
        } else {
          where = page.order;
        }

        this.routesAndLinks.splice(where, 0, this.routesAndLinks.splice(idx, 1)[0]);
      }
    });
  }

  set setRoute(route) {
    this.routesAndLinks.push(route);
  }

  get getRoutes() {
    return this.routesAndLinks;
  }
}

export default RoutesCreator;
