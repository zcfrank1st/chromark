angular
  .module('app',[])
  .filter('m2c', function() {
    return function(c) {
      var content = c || '';
      return marked(content);
    };
  })
  .config(function($sceProvider) {
    enableTab('tab');
    $sceProvider.enabled(false);
  })
  .controller('appController', function ($scope) {
    $scope.open = function () {
      chrome.fileSystem.chooseEntry({type: 'openFile'},
        function (fe) {
          if(chrome.runtime.lastError) {
            console.warn("Whoops.. " + chrome.runtime.lastError.message);
          } else {
            if (fe) {
              fe.file(function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                  $scope.markdown = this.result; // ?? TODO 为什么有问题
                };
                reader.readAsText(file);
              });
            }
          }
        }
      );
    };

    $scope.save = function () {
      chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
        if(chrome.runtime.lastError) {
          console.warn("Whoops.. " + chrome.runtime.lastError.message);
        } else {
          if(writableFileEntry) {
            writableFileEntry.createWriter(function(writer) {
              writer.write(new Blob([$scope.markdown], {type: 'text/plain'}));
            });
          }
        }
      });
    };
  });