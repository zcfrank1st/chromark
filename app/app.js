angular
  .module('app',[])
  .filter('m2c', function() {
    return function(c) {
      var content = c || '';
      return marked(content);
      // return toHTML(content);
    };
  })
  .config(function($sceProvider) {
    enableTab('tab');
    $sceProvider.enabled(false);
  })
  .controller('appController', function ($scope) {
    $scope.open = function () {
      $scope.markdown = "hello world";
      chrome.fileSystem.chooseEntry({type: 'openFile'},
        function (fe) {
          if(chrome.runtime.lastError) {
            console.warn("Whoops.. " + chrome.runtime.lastError.message);
          } else {
            if (fe) {
              fe.file(function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                  $scope.markdown = this.result;
                  $scope.$apply(); // 游离在$scope之外的操作
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