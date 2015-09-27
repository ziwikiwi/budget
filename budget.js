


Router.route('/login');
Router.route('/',{
  name:'register',
  template:'register'
});
Router.route('/create');
Router.route('/view');
Router.route('/home');
Router.route('/logout');
if (Meteor.isClient){
  Template.login.onCreated(function(){
    console.log("The 'login' template was just created.");
});

Template.login.onRendered(function(){
    $('.login').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
                    if(error.reason == "User not found"){
                        validator.showErrors({
                            email: error.reason    
                        });
                    }
                    if(error.reason == "Incorrect password"){
                        validator.showErrors({
                            password: error.reason    
                        });
                    }
                } else {
                    var currentRoute = Router.current().route.getName();
                    if(currentRoute == "login"){
                        Router.go("home");
                    }
                }
            });
        }
    });
});

Template.register.onRendered(function(){
    $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
              if(error){
                  if(error.reason == "Email already exists."){
                      validator.showErrors({
                          email: "That email already belongs to a registered user."   
                      });
                  }
              }else {
                    Router.go("home");
                }
            });
        }    
    });
});

Template.login.onDestroyed(function(){
    console.log("The 'login' template was just destroyed.");
});
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