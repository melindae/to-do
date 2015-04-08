var toDo = angular.module('ToDo', ['ui.router', 'firebase']);


mouse hover = time since entry

mouse click = edit 

var taskTemplate =  {

  *task: 'do something',
  *priority: '4 options',
  *time-stamp: 'enter time',
  *taskComplete: 'y/n',
  
  // taskCompleteStamp 'some date',
  // type: 'self populating',
  // deadline: 'day or days',
  // actionDay: 'specific day',
  // repeat: 'y, n, week, plus',
  // extra notes: 'blah blah',

}





  var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: '/images/album-placeholder.png',

   songs: [
       { name: 'Blue', length: '4:26' },
       { name: 'Green', length: '3:14' },
       { name: 'Red', length: '5:01' },
       { name: 'Pink', length: '3:21'},
       { name: 'Magenta', length: '2:15'}
     ]
  };

  <div ng-repeat="album in albums" class="collection-album-container col-md-2">
    <div class="collection-album-info caption">
      <p>
        <a class="album-name" ui-sref="album"> {{ album.name }} </a>
          <br/>
        <a ui-sref="album"> {{ album.artist }} </a>
          <br/>
           {{ album.songs.length }} songs
          <br/>
      </p>
    </div>
  </div>

