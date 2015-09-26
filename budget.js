if (Meteor.isClient){console.log("line 1");
  Template.register.events({
      'submit': function(event){
        console.log("line 4");
          event.preventDefault();
          var email = $('[name=email]').val();
          var password = $('[name=password]').val();

          Accounts.createUser({
            email: email,
            password: password
          });

      }
  });
}