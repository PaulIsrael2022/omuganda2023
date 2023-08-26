const clanMenu = [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'home'
    },
    {
      name: 'Manage Clan Page',
      icon: 'edit',
      submenu: [
        {
          name: 'Manage Clan Info',
          url: 'clan-page-info'
        },
        {
          name: 'View Clan Head Lineage',
          url: 'view-clan-lineage'
        },
        {
          name: 'Clan History',
          url: 'clan-history'
        },
        // rest of links
        {
            name: 'Notable Members',
            url: 'notable-members'
          },
          {
            name: 'Traditions',
            url: 'clan-traditions'
          },
          {
            name: 'Oral Histories/Stories',
            url: 'oral-histories'
          },
          {
            name: 'Media Gallery',
            url: 'media-gallery'
          },
      ]
    },
    {
      name: 'Clan Members', 
      icon: 'users',
      submenu: [
        {
          name: 'Members List',
          url: 'members-list'
        },
        {  
          name: 'Members Map',
          url: 'members-map'
        }
      ]
    },
    {
      name: 'Messages',
      icon: 'message-square',
      submenu: [
        {
          name: 'Member Communications',
          url: 'member-communications'
        },
        {
          name: 'Broadcast Messages',
          url: 'broadcast-messages'
        },
        {
          name: 'Email Newsletters',
          url: 'email-newsletters'
        },
        // other message links
      ]
    },
    {
      name: 'Account',
      icon: 'user',
      submenu: [
        {
          name: 'Profile',
          url: 'account-profile'
        },
        // other account links
      ]
    },
    {
      name: 'Admin Help',
      icon: 'help-circle',
      url: '#' 
    }
  ];
  
  const userMenu = [
    {
      name: 'Dashboard', 
      url: '/',
      icon: 'home'
    },
    {
        name: 'Profile Management',
        submenu: [
          {
            name: 'View Profile',
            url: '/profile'
          },
          {
            name: 'Update Personal Information', 
            url: '/update-info'
          },
          {
            name: 'Add/Edit Profile Pictures',
            url: '/edit-pictures'
          }
        ]  
      },
    {
      name: 'Manage Ancestry & Family Tree',
      icon: 'users',
      submenu: [
        {
          name: 'Family Tree',
          submenu: [
            {
              name: 'View Family Tree',
              url: '/family-tree'
            },
            {
              name: 'Add New Family Members',
              url: '/add-new-family-members'
            },
            {
              name: 'Edit Existing Family Member',
              url: '/edit-existing-family-member'
            },
            {
              name: 'Remove Family Member',
              url: '/remove-family-member'
            },
            // other links
          ]
        },
        {
          name: 'Ancestry Research',
          submenu: [
            {
              name: 'Search Historical Records',
              url: '/search-records'
            },
            {
              name: 'Explore Ancestral Locations',
              url: '/explore-clan-ancestral-locations'
            },
            {
              name: 'Connect with DNA Relatives',
              url: '/connect-with-dns-relatives'
            },
            // other links
          ]
        },
        {
          name: 'Media & Documents',
          url: '/media'
        },
        {
          name: 'Privacy & Sharing',
          url: '/privacy'
        },
        {
          name: 'Data Backup & Export',
          url: '/data-backup'
        },
        // other top level links
      ]
    }
    // other user links
  ];