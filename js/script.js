var channels = ['brunofin', 'esl_sc2', 'freecodecamp', 'fengb', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'ogamingsc2', 'noobs2ninjas', 'beohoff', 'codingrainbow'];
var count = 1;
for (var j = 0; j < channels.length; j++) {
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/' + channels[j] + '?callback=?',
    dataType: 'jsonp',
    success: function(data) {
      if (data.stream === null) {
        $.ajax({
          url: data._links.channel,
          //async: false,
          dataType: 'jsonp',
          success: function(info) {
            $('#label' + count).append(info.display_name);
            $('#status' + count).append(info.display_name + ' is offline. Come back later!');
            if (info.logo !== null) {
              $('#logo' + count).attr('src', info.logo);
            }
            $('#logo' + count).wrap('<a href=' + info.url + ' target="_blank"></a>')
            count++;
          }
        });

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