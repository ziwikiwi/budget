

Router.route('/register');
Router.route('/login');
Router.route('/',{
  template:'register'
});
Router.route('/create');
Router.route('/view');
Router.route('/home');
if (Meteor.isClient){
  console.log("line 1");
  Template.register.events({
      'submit': function(event){
        console.log("line 4");
          event.preventDefault();
          var email = $('[name=email]').val();
          var password = $('[name=password]').val();

          Accounts.createUser({
            email: email,
            password: password
          })
          Router.go("home");
      }
      
  });
  console.log("line 20");
  Template.login.events({
    'submit': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password,function(error){
          if (error){
            console.log(error.reason);
          }
          else{
            Router.go("home");
          }
        });
    }
});



}