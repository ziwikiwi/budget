Expenses = new Meteor.Collection('expenses');
Revenues = new Meteor.Collection('revenues');


Router.route('/login');
Router.route('/',{
  name:'register',
  template:'register'
});
Router.route('/create');
Router.route('/view');
Router.route('/home');
Router.route('/logout');
if (Meteor.isClient) {
    Template.login.onCreated(function () {
        console.log("The 'login' template was just created.");
    });

    var h_expenses = Meteor.subscribe('expenses');
    var h_revenues = Meteor.subscribe('revenues');

    var expData;
    var revData;

    var expCategory;
    var revCategory;

    var ExpChartData;
    var RevChartData;
    var PieChart;




    Tracker.autorun(function () {


        if (h_expenses.ready()) {
            if (expCategory == "")
                expData = Expenses.find().fetch();
            else
                expData = Expenses.find({"id": expCategory}).fetch();
            ExpChartData = expData.map(function (data) {
                return {label: data.Category, value: data.Amount, color: "#66CCCC"};
            });
            console.log(ExpChartData);
        }
        if (h_revenues.ready()) {
            if (revCategory == "")
                revData = Revenues.find().fetch();
            else
                revData = Revenues.find({"id": revCategory}).fetch();
            RevChartData = revData.map(function (data) {
                return {label: data.Category, value: data.Amount, color:"#FFCCFF"};
            });

        }
    })

    Template.login.onRendered(function () {
        $('.login').validate({
            submitHandler: function (event) {
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                Meteor.loginWithPassword(email, password, function (error) {
                    if (error) {
                        if (error.reason == "User not found") {
                            validator.showErrors({
                                email: error.reason
                            });
                        }
                        if (error.reason == "Incorrect password") {
                            validator.showErrors({
                                password: error.reason
                            });
                        }
                    } else {
                        var currentRoute = Router.current().route.getName();
                        if (currentRoute == "login") {
                            Router.go("home");
                        }
                    }
                });
            }
        });
    });

    Template.register.onRendered(function () {
        $('.register').validate({
            submitHandler: function (event) {
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                Accounts.createUser({
                    email: email,
                    password: password
                }, function (error) {
                    if (error) {
                        if (error.reason == "Email already exists.") {
                            validator.showErrors({
                                email: "That email already belongs to a registered user."
                            });
                        }
                    } else {
                        Router.go("home");
                    }
                });
            }
        });
    });

    Template.login.onDestroyed(function () {
        console.log("The 'login' template was just destroyed.");
    });
    Template.register.events({
        'submit': function (event) {
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
    Template.login.events({
        'submit': function (event) {
            event.preventDefault();

            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    Router.go("home");
                }
            });


        }
    });

    Template.containers.rendered = function () {
        var canvas = $("#chartCanvasId")[0];
        console.log(canvas);
        var context = canvas.getContext("2d");
        console.log(context);
        var options = {
            tooltipTemplate: function(label){return  label.label + ": " + '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }
        PieChart = new Chart(context).Pie(RevChartData, options);
        console.log(PieChart);
        console.log(RevChartData);
        window.piechart = PieChart;

        var canvas2 = $("#expCanvasId")[0];
        console.log(canvas2);
        var context2 = canvas2.getContext("2d");
        console.log(context2);
        var options2 = {
            tooltipTemplate: function(label){return  label.label + ": " + '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }
        PieChart2 = new Chart(context2).Pie(ExpChartData, options2);
        console.log(PieChart2);
        console.log(ExpChartData);
        window.piechart = PieChart2;

    };
}
    if (Meteor.isServer) {
        Meteor.startup(function () {
            Meteor.publish('expenses', function () {
                return Expenses.find();
            });
            Meteor.publish('revenues', function () {
                return Revenues.find();
            });
        })
    }

