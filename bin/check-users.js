var star = '😜';

var github = require( 'github' )
	, g      = new github( {
		version  : '3.0.0',
		// debug    : true,
		protocol : 'https',
		timeout  : 5000,

		headers  : {
			'user-agent': 'jane-prefers-the-shell-over-the-webz-thx'
		}
	} );

if (process.env.GH_TOKEN) {
	g.authenticate( {
		type    : 'oauth',
		token   : process.env.GH_TOKEN
	} )
}
else if (process.env.GH_SECRET) {
	g.authenticate( {
		type    : 'oauth',
		key     : process.env.GH_KEY,
		secret  : process.env.GH_SECRET
	} )
}


g.orgs.getMembers( {
	org: '18F',
	filter: '2fa_disabled',
} , function (e, m) {
		var results     = [ ]
			, longest_id = longest( [ m.map( function (user) { return '' + user.id } ) ] );

		m.forEach( function (user) {
			results.push( ' ' + star + '  [' + rpad( user.id, longest_id + 1) + ']  ' + user.login );
		} );

		console.log( results.join( "\n" ) );
} );


// Stolen from sendak-usage
//
// Get the longest string from a list
//
function longest (l) { // {{{
	var maxlen = 0;
	l.shift().forEach( function (s) { if (s.length > maxlen) { maxlen = s.length } } );
	return maxlen;
} // }}}

// String right padding helper
//
function rpad(str, length) { // {{{
	str = '' + str;
	while (str.length < length) { str = str + ' ' }
	return str;
} // }}}

/*
  FOR EXAMPLE: {{{

  { url: 'https://api.github.com/repos/avriette/riak-dc/issues/4',
    labels_url: 'https://api.github.com/repos/avriette/riak-dc/issues/4/labels{/name}',
    comments_url: 'https://api.github.com/repos/avriette/riak-dc/issues/4/comments',
    events_url: 'https://api.github.com/repos/avriette/riak-dc/issues/4/events',
    html_url: 'https://github.com/avriette/riak-dc/issues/4',
    id: 47832613,
    number: 4,
    title: 'add verbosity & logging',
    user: 
     { login: 'avriette',
       id: 777319,
       avatar_url: 'https://avatars.githubusercontent.com/u/777319?v=3',
       gravatar_id: '',
       url: 'https://api.github.com/users/avriette',
       html_url: 'https://github.com/avriette',
       followers_url: 'https://api.github.com/users/avriette/followers',
       following_url: 'https://api.github.com/users/avriette/following{/other_user}',
       gists_url: 'https://api.github.com/users/avriette/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/avriette/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/avriette/subscriptions',
       organizations_url: 'https://api.github.com/users/avriette/orgs',
       repos_url: 'https://api.github.com/users/avriette/repos',
       events_url: 'https://api.github.com/users/avriette/events{/privacy}',
       received_events_url: 'https://api.github.com/users/avriette/received_events',
       type: 'User',
       site_admin: false },
    labels: [ [Object], [Object] ],
    state: 'open',
    locked: false,
    assignee: null,
    milestone: null,
    comments: 1,
    created_at: '2014-11-05T12:52:48Z',
    updated_at: '2014-11-05T18:57:00Z',
    closed_at: null,
    body: 'See [Sendak #33](https://github.com/18F/Sendak/issues/33)' },
  meta: { 'x-ratelimit-limit': '5000',
    'x-ratelimit-remaining': '4994',
    'x-ratelimit-reset': '1416928066',
    etag: '"54e9b4553e9ebe6ca2b9a3e098a7a981"',
    status: '200 OK' } ]

  }}}
*/
