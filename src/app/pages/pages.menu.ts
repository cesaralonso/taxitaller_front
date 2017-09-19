export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'talleres',
        data: {
          menu: {
            title: 'general.menu.talleres',
            icon: 'ion-medkit',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'vehiculos',
        data: {
          menu: {
            title: 'general.menu.vehiculos',
            icon: 'ion-model-s',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'permisos',
        data: {
          menu: {
            title: 'general.menu.permisos',
            icon: 'ion-key',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'liquidaciones',
        data: {
          menu: {
            title: 'general.menu.liquidaciones',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'bonificaciones',
        data: {
          menu: {
            title: 'general.menu.bonificaciones',
            icon: 'ion-social-usd-outline',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'choferes',
        data: {
          menu: {
            title: 'general.menu.choferes',
            icon: 'ion-ios-body',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'admin',
        data: {
          menu: {
            title: 'general.menu.admin',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'users',
            data: {
              menu: {
                title: 'general.menu.usuarios',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'groups',
            data: {
              menu: {
                title: 'general.menu.grupos',
                icon: 'ion-ios-people',
                selected: false,
                expanded: false,
                order: 1
              }
            }
          },
          {
            path: 'reportes',
            data: {
              menu: {
                title: 'general.menu.reportes',
                icon: 'ion-document-text',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
        ]
      }
    ]
  }
];
