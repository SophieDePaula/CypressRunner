import '@applitools/eyes.cypress/commands'


describe('Hello world', () => {
  it('Cypress_demo', () => {

            var appName = "";
            var testName = "";
            var batchName = "";
            var matchLevel  = "Strict";

            cy.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                // debugger
                return false
            })
          

            // Cypress.Errors.onUncaughtException(false);
            cy.fixture("config.csv").then((config) => {
              
              var test_config = config.split('\n');
              var current_config;

              for(var i = 1; i < test_config.length; i++){

                  current_config = test_config[i].split(',');

                  if(current_config[0] == "app name")
                    appName = current_config[1];
                  else if(current_config[0] == "test name")
                    testName = current_config[1];
                  else if(current_config[0] == "batch name")
                    testName = current_config[1];
                  else if(current_config[0] == "match level" && current_config[1] != '')
                    matchLevel = current_config[1].trim();

              }

              if(batchName == "")
                batchName = testName;

                cy.fixture("environments.csv").then((envs) =>
                {
                
                  var my_envs = envs.split('\n');
                
                  var env_array = [];
                  var browser;
                  var width;
                  var height;
                  var deviceName;
                  var orientation;
                  
                   for(var i = 1; i < my_envs.length; i++){
                   
                      var env_config = my_envs[i].split(',');
                      if(env_config[0] != ''){

                        browser = env_config[0];
                        var viewport_size = env_config[1].trim().split('-');
                        width = viewport_size[0];
                        height = viewport_size[1];
                        env_array[i-1] = {width:Number(width), height:Number(height), name:browser};
                        cy.log("Environment #" + i.toString() + ": Desktop " + browser);

                      }
                      else{
                        deviceName = env_config[2].trim();
                        orientation = env_config[3].trim();

                        env_array[i-1] = {deviceName: deviceName, screenOrientation: orientation};
                        cy.log("Environment #" + i.toString() + ": " + deviceName + " ");

                      }                      


                    }

                    cy.fixture("urls.csv").then((urls) => {

                      var my_urls = urls.split('\n');

                      cy.eyesOpen({
                          appName: appName,
                          testName: testName,
                          browser: env_array,
                          batchName: batchName,
                          matchLevel: matchLevel
                        });

                      for(var url = 1; url < my_urls.length; url++){
                        
                        if(my_urls[url] != '')
                        {
                          cy.log("******************** URL#" + url.toString() + "********************");
                          cy.visit(my_urls[url]);

                          // if(cy.get("body > form > div.CookieBanner-close > img"))
                          //   cy.get('body > form > div.CookieBanner-close > img').click();

                          cy.eyesCheckWindow(my_urls[url]);  
                        }  

                      }
                      cy.eyesClose(false);

                });
             });
          });
  });  
});

  

