var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator');
const { isAuth, authorize} = require('../middleware/middlewares.js'); 
const clanController = require('../controllers/clanAccount');
const {FamilyTree, ClanHistory, NoteworthyClanMember, Tradition, ClanProfile } = require("../models/clan_account");



module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }

      }

      app.get('/', isAuth, function (req, res) {
            res.locals = { title: 'Dashboard' };
            res.render('Clan Account/clan_dashboard',{
                  role: req.user.role // pass the user role to the layout
                }); 
      });

      // Layouts 

      // Clan Dashboard
      app.get('/clan-dashboard', isAuth, authorize("clan","admin"), function (req, res) {
            console.log(req.user)
      res.locals = { title: 'Clan Dashboard' };
      res.render('Clan Account/clan_dashboard', {
            role: req.user.role // pass the user role to the layout
          });  
    });

    app.post('/clan/bio', clanController.saveClanProfile);

    app.get('/clan-info', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Record Clan History' };
      res.render('Clan Account/record_clan_information',{
            role: req.user.role // pass the user role to the layout
          }); 
    });

    app.get('/notable-members', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Notable Memebers' };
      res.render('Clan Account/notable-members',{
            role: req.user.role // pass the user role to the layout
          }); 
    });

    app.get('/clan/record', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Record' };
      res.render('Clan Account/record_clan_information',{
            role: req.user.role // pass the user role to the layout
          }); 
    });
    app.get('/clan-history', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Clan History' };
      res.render('Clan Account/clan-history',{
            role: req.user.role // pass the user role to the layout
          }); 
    });

    app.get('/clan-traditions', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Clan Traditions' };
      res.render('Clan Account/traditions',{
            role: req.user.role // pass the user role to the layout
          }); 
    });

    app.get('/view-clan-lineage', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'View Clan Head Lineage' };
      res.render('Clan Account/view-clan-head-lineage',{
            role: req.user.role // pass the user role to the layout
          }); 
    });

    
app.get('/clan-profile', isAuth, authorize("clan","admin"), async function (req, res) {
      res.locals = { title: 'Profile' };
       // Get the clan profile associated with the current user
      const clanProfile = await ClanProfile.findOne({ user: req.user.id });
      console.log(clanProfile)
      res.render('Clan Account/clan_profile', {
            role: req.user.role, // pass the user role to the layout
            clanProfile
      });
});
    

// User Account
     // Clan Dashboard
     app.get('/user-dashboard', isAuth, authorize('user'), function (req, res) {
      res.locals = { title: 'User Dashboard' };
      res.render('user account/user-dashboard',{
            role: req.user.role // pass the user role to the layout
          } ); 
    });

// Standalone

app.get('/profile', isAuth, authorize("clan","admin"), function (req, res) {
      res.locals = { title: 'Profile' };
      res.render('Contacts/contacts-profile', {
            role: req.user.role // pass the user role to the layout
      });
});

app.get('/contacts-grid', isAuth, authorize("clan","admin"), function (req, res) {
            res.locals = { title: 'User Grid' };
            res.render('Contacts/contacts-grid',{
                  role: req.user.role // pass the user role to the layout
            });
});











//     =======================================================================================================================================
      app.get('/index-dark', function (req, res) {
            res.locals = { title: 'Vertical Dark' };
            res.render('Dashboard/index', { layout: 'layoutsDark' });
      });
      app.get('/index-rtl', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Rtl' };
            res.render('Dashboard/index', { layout: 'layoutsRtl' });
      });   
      app.get('/layouts-dark-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dark Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsDarkSidebar' });
      });
      app.get('/layouts-compact-sidebar', function (req, res) {
            res.locals = { title: 'Compact Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsCompactSidebar' });
      });
      app.get('/layouts-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Scollable Layout' };
            res.render('Dashboard/index', { layout: 'layoutsScrollable' });
      });
      app.get('/layouts-icon-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Icon Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsIconSidebar' });
      });
      app.get('/layouts-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsBoxed' });
      });
      app.get('/layouts-colored-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsColoredSidebar' });
      });

      app.get('/layouts-horizontal', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal' };
            res.render('Dashboard/index', { layout: 'layoutsHorizontal' });
      });
      app.get("/layouts-horizontal-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Dark' };
            res.render("Dashboard/index", { layout: "layoutHDarkLayout" });
      });

      app.get("/layouts-horizontal-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Rtl' };
            res.render("Dashboard/index", { layout: "layoutHRtlLayout" });
      });
      app.get('/layouts-horizontal-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Boxed' };
            res.render('Dashboard/index', { layout: 'layoutsHBoxed' });
      });
      app.get('/layouts-horizontal-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Scrollable' };
            res.render('Dashboard/index', { layout: 'layoutsHScrollable' });
      });
      app.get('/layouts-horizontal-dark-topbar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Dark Topbar' };
            res.render('Dashboard/index', { layout: 'layoutsHTopbarDark' });
      });


      // Calendar
      app.get('/calendar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Calendar' };
            res.render('Calendar/calendar');
      });

      // Chat
      app.get('/apps-chat', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chat' };
            res.render('Chat/apps-chat');
      });

      // Email
      app.get('/email-inbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Inbox' };
            res.render('Email/email-inbox');
      });
      app.get('/email-read', isUserAllowed, function (req, res) {
            res.locals = { title: 'Email Read' };
            res.render('Email/email-read');
      });
      app.get('/email-verification', isUserAllowed, function (req, res) {
            res.locals = { title: 'Email Verification' };
            res.render('Email/email-verification');
      });


      app.get('/contacts-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'User List' };
            res.render('Contacts/contacts-list');
      });


      //invoices
      app.get('/invoices-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoice List' };
            res.render('Invoices/invoices-list');
      });
      app.get('/invoices-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoice Detail' };
            res.render('Invoices/invoices-detail');
      });

      // Utility
      app.get('/pages-starter', isUserAllowed, function (req, res) {
            res.locals = { title: 'Starter Page' };
            res.render('Pages/pages-starter');
      });
      app.get('/pages-maintenance', isUserAllowed, function (req, res) {
            res.locals = { title: 'Maintenance' };
            res.render('Pages/pages-maintenance');
      });
      app.get('/pages-comingsoon', isUserAllowed, function (req, res) {
            res.locals = { title: 'Coming Soon' };
            res.render('Pages/pages-comingsoon');
      });
      app.get('/pages-timeline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Timeline' };
            res.render('Pages/pages-timeline');
      });
      app.get('/pages-faqs', isUserAllowed, function (req, res) {
            res.locals = { title: 'FAQs' };
            res.render('Pages/pages-faqs');
      });
      app.get('/pages-pricing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Pricing' };
            res.render('Pages/pages-pricing');
      });
      app.get('/pages-404', isUserAllowed, function (req, res) {
            res.locals = { title: 'Error 404' };
            res.render('Pages/pages-404');
      });
      app.get('/pages-500', isUserAllowed, function (req, res) {
            res.locals = { title: 'Error 500' };
            res.render('Pages/pages-500');
      });


      // UI Elements
      app.get('/ui-alerts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alerts' };
            res.render('Ui/ui-alerts');
      });
      app.get('/ui-buttons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buttons' };
            res.render('Ui/ui-buttons');
      });
      app.get('/ui-cards', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cards' };
            res.render('Ui/ui-cards');
      });
      app.get('/ui-carousel', isUserAllowed, function (req, res) {
            res.locals = { title: 'Carousel' };
            res.render('Ui/ui-carousel');
      });
      app.get('/ui-colors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colors' };
            res.render('Ui/ui-colors');
      });
      app.get('/ui-dropdowns', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dropdowns' };
            res.render('Ui/ui-dropdowns');
      });
      app.get('/ui-general', isUserAllowed, function (req, res) {
            res.locals = { title: 'General' };
            res.render('Ui/ui-general');
      });
      app.get('/ui-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Grid' };
            res.render('Ui/ui-grid');
      });
      app.get('/ui-images', isUserAllowed, function (req, res) {
            res.locals = { title: 'Images' };
            res.render('Ui/ui-images');
      });
      app.get('/ui-modals', isUserAllowed, function (req, res) {
            res.locals = { title: 'Modals' };
            res.render('Ui/ui-modals');
      });
      app.get('/ui-offcanvas', isUserAllowed, function (req, res) {
            res.locals = { title: 'Offcanvas' };
            res.render('Ui/ui-offcanvas');
      });
      app.get('/ui-progressbars', isUserAllowed, function (req, res) {
            res.locals = { title: 'Progress Bars' };
            res.render('Ui/ui-progressbars');
      });
      app.get('/ui-tabs-accordions', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tabs & Accordions' };
            res.render('Ui/ui-tabs-accordions');
      });
      app.get('/ui-typography', isUserAllowed, function (req, res) {
            res.locals = { title: 'Typography' };
            res.render('Ui/ui-typography');
      });
      app.get('/ui-video', isUserAllowed, function (req, res) {
            res.locals = { title: 'Video' };
            res.render('Ui/ui-video');
      });

      //Extended

      app.get('/extended-lightbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lightbox' };
            res.render('Extended/extended-lightbox');
      });
      app.get('/extended-notifications', isUserAllowed, function (req, res) {
            res.locals = { title: 'Notifications' };
            res.render('Extended/extended-notifications');
      });
      app.get('/extended-rangeslider', isUserAllowed, function (req, res) {
            res.locals = { title: 'Range Slider' };
            res.render('Extended/extended-rangeslider');
      });
      app.get('/extended-rating', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rating' };
            res.render('Extended/extended-rating');
      });
      app.get('/extended-session-timeout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Session Timeout' };
            res.render('Extended/extended-session-timeout');
      });
     
      app.get('/extended-sweet-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'SweetAlert 2' };
            res.render('Extended/extended-sweet-alert');
      });

      

      // Forms
      app.get('/form-elements', isUserAllowed, function (req, res) {
            res.locals = { title: 'Basic Elements' };
            res.render('Form/form-elements');
      });
      app.get('/form-validation', isUserAllowed, function (req, res) {
            res.locals = { title: 'Validation' };
            res.render('Form/form-validation');
      });
      app.get('/form-advanced', isUserAllowed, function (req, res) {
            res.locals = { title: 'Advanced Plugins' };
            res.render('Form/form-advanced');
      });
      app.get('/form-editors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Editor' };
            res.render('Form/form-editors');
      });
      app.get('/form-uploads', isUserAllowed, function (req, res) {
            res.locals = { title: 'File Upload' };
            res.render('Form/form-uploads');
      });
      app.get('/form-wizard', isUserAllowed, function (req, res) {
            res.locals = { title: 'Wizard' };
            res.render('Form/form-wizard');
      });
      app.get('/form-mask', isUserAllowed, function (req, res) {
            res.locals = { title: 'Mask' };
            res.render('Form/form-mask');
      });

      // Tables
      app.get('/tables-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Bootstrap Basic' };
            res.render('Tables/tables-basic');
      });
      app.get('/tables-datatable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Data Tables' };
            res.render('Tables/tables-datatable');
      });
      app.get('/tables-responsive', isUserAllowed, function (req, res) {
            res.locals = { title: 'Responsive' };
            res.render('Tables/tables-responsive');
      });
      app.get('/tables-editable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Editable' };
            res.render('Tables/tables-editable');
      });


      // Charts
      app.get('/charts-apex', isUserAllowed, function (req, res) {
            res.locals = { title: 'Apex charts' };
            res.render('Charts/charts-apex');
      });
      app.get('/charts-chartjs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chartjs' };
            res.render('Charts/charts-chartjs');
      });
      app.get('/charts-echart', isUserAllowed, function (req, res) {
            res.locals = { title: 'E Chart' };
            res.render('Charts/charts-echart');
      });
      app.get('/charts-knob', isUserAllowed, function (req, res) {
            res.locals = { title: 'Jquery Knob' };
            res.render('Charts/charts-knob');
      });
      app.get('/charts-sparkline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sparkline' };
            res.render('Charts/charts-sparkline');
      });


      // Icons
      app.get('/icons-boxicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxicons' };
            res.render('Icons/icons-boxicons');
      });
      app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
            res.locals = { title: 'Material Design Icons' };
            res.render('Icons/icons-materialdesign');
      });
      app.get('/icons-dripicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dripicons' };
            res.render('Icons/icons-dripicons');
      });
      app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
            res.locals = { title: 'Font Awesome 5' };
            res.render('Icons/icons-fontawesome');
      });

      // Maps
      app.get('/maps-google', isUserAllowed, function (req, res) {
            res.locals = { title: 'Google' };
            res.render('Maps/maps-google');
      });
      app.get('/maps-leaflet', isUserAllowed, function (req, res) {
            res.locals = { title: 'leaflet' };
            res.render('Maps/maps-leaflet');
      });
      app.get('/maps-vector', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vector' };
            res.render('Maps/maps-vector');
      });

}