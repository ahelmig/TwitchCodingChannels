var channels = ['esl_sc2', 'freecodecamp', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'ogamingsc2', 'noobs2ninjas'];
var count = 1;
for (var j = 0; j < channels.length; j++) {
  $.ajax({
    url: 'https://wind-bow.hyperdev.space/twitch-api/streams/' + channels[j] + '?callback=?',
    dataType: 'jsonp',
    success: function(data) {
      if (data.stream === null) {
        var ch = data._links.channel;
        var ind = ch.lastIndexOf('/');
        var name = ch.slice(ind+1);
        $('#label'+count).append(name);
        $('#status' + count).append('Looks like '+ name + ' is offline. Come back later!');
        $('#' + count).addClass('hidden');
        $('#logo' + count).addClass('hidden');
        count++;
      }
      if (data.error === 'Unprocessable Entity') {
        var a = data.message.indexOf("'");
        var b = data.message.lastIndexOf("'");
        var c = data.message.slice(a+1, b);
        $('#label' + count).append(c);
        $('#status' + count).append('Oops. Looks like ' + c+ ' is closed or never existed.');
        $('#' + count).addClass('hidden');
        $('#logo' + count).addClass('hidden');
        count++;
      } else {
        $('#label'+count).append(data.stream.channel.display_name);
        $('#status' + count).append(data.stream.game + ': ' + data.stream.channel.status + ' is live!');
        $('#preview' + count).attr('src', data.stream.preview.large);
        $('#logo' + count).attr('src', data.stream.channel.logo);
        $('#logo' + count).wrap('<a href=' + data.stream.channel.url + ' target="_blank"></a>');
        count++;
      }
    }
  });
}
