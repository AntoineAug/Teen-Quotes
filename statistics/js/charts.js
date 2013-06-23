google.load('visualization', '1',
{
	'packages': ['geochart', 'corechart'],
	'language': 'fr_FR'
});

function drawMapGeo()
{
	var data = google.visualization.arrayToDataTable([
		['Pays', 'Visites'],
		['United States', 710295],
		['Canada', 79054],
		['United Kingdom', 71119],
		['Philippines', 47436],
		['Malaysia', 24587],
		['Australia', 20552],
		['Singapore', 14806],
		['Norway', 9795],
		['India', 9759],
		['Indonesia', 9601],
		['France', 9413],
		['Netherlands', 8483],
		['Germany', 7903],
		['Mexico', 6803],
		['Sweden', 6272],
		['Ireland', 6039],
		['New Zealand', 4404],
		['Belgium', 3791],
		['United Arab Emirates', 3539],
		['Saudi Arabia', 3180],
		['Egypt', 2582],
		['Puerto Rico', 1951],
		['Romania', 1926],
		['South Africa', 1912],
		['Denmark', 1842],
		['Thailand', 1552],
		['Hong Kong', 1549],
		['Poland', 1480],
		['Jamaica', 1339],
		['Spain', 1296],
		['Japan', 1236],
		['Israel', 1231],
		['Malta', 1225],
		['Pakistan', 1196],
		['Austria', 1189],
		['Guam', 1122],
		['Portugal', 1100],
		['Lebanon', 1085],
		['Trinidad and Tobago', 945],
		['Italy', 933],
		['Switzerland', 927],
		['Brazil', 842],
		['Mauritius', 841],
		['Finland', 822],
		['Serbia', 749],
		['Cyprus', 721],
		['Greece', 714],
		['Morocco', 623],
		['Qatar', 600],
		['Nigeria', 592],
		['Colombia', 590],
		['Dominican Republic', 584],
		['Peru', 576],
		['Kuwait', 574],
		['Suriname', 570],
		['Algeria', 558],
		['China', 538],
		['Hungary', 530],
		['Vietnam', 528],
		['Albania', 518],
		['Bahamas', 509],
		['Slovenia', 481],
		['Turkey', 464],
		['Belize', 458],
		['Jordan', 457],
		['Lithuania', 454],
		['U.S. Virgin Islands', 428],
		['El Salvador', 422],
		['Honduras', 414],
		['Guatemala', 410],
		['Chile', 406],
		['Panama', 405],
		['Brunei', 402],
		['Croatia', 402],
		['Bulgaria', 393],
		['Argentina', 375],
		['Bahrain', 375],
		['Sri Lanka', 369],
		['Venezuela', 364],
		['Northern Mariana Islands', 361],
		['Ecuador', 352],
		['Kenya', 332],
		['Bangladesh', 312],
		['Russia', 311],
		['Nepal', 299],
		['Tunisia', 282],
		['Guyana', 281],
		['Estonia', 271],
		['Nicaragua', 265],
		['Macau', 263],
		['Costa Rica', 236],
		['South Korea', 235],
		['Botswana', 227],
		['Bosnia and Herzegovina', 226],
		['Turks and Caicos Islands', 221],
		['Aruba', 201],
		['Luxembourg', 200],
		['Ukraine', 198],
		['Cambodia', 196],
		['Bermuda', 192],
		['Barbados', 191],
		['Iceland', 191],
		['Czech Republic', 178],
		['Maldives', 169],
		['Oman', 169],
		['Tanzania', 166],
		['Georgia', 157],
		['Uruguay', 155],
		['Jersey', 151],
		['Bolivia', 146],
		['Montenegro', 137],
		['Ghana', 136],
		['Slovakia', 134],
		['Iraq', 132],
		['Dominica', 126],
		['Syria', 125],
		['Saint Vincent and the Grenadines', 125],
		['Cayman Islands', 123],
		['Saint Lucia', 119],
		['Namibia', 116],
		['Netherlands Antilles', 113],
		['Taiwan', 109],
		['Côte d’Ivoire', 96],
		['Latvia', 93],
		['Senegal', 87],
		['Kosovo', 87],
		['Zimbabwe', 81],
		['Paraguay', 78],
		['Mozambique', 74],
		['Belarus', 72],
		['British Virgin Islands', 71],
		['Fiji', 69],
		['Guernsey', 66],
		['Ethiopia', 63],
		['Sudan', 59],
		['Uganda', 59],
		['Isle of Man', 57],
		['Antigua and Barbuda', 56],
		['Moldova', 55],
		['Mongolia', 55],
		['Haiti', 53],
		['Iran', 53],
		['Cameroon', 52],
		['Malawi', 46],
		['Gibraltar', 45],
		['Armenia', 42],
		['Marshall Islands', 42],
		['Zambia', 42],
		['Palestine', 41],
		['Seychelles', 38],
		['Libya', 35],
		['Azerbaijan', 32],
		['Bhutan', 32],
		['Yemen', 31],
		['Saint Kitts and Nevis', 29],
		['Gambia', 26],
		['Rwanda', 26],
		['Curaçao', 23],
		['French Polynesia', 23],
		['Andorra', 20],
		['Réunion', 20],
		['Monaco', 18],
		['Madagascar', 17],
		['Angola', 16],
		['Åland Islands', 16],
		['Kazakhstan', 16],
		['Anguilla', 15],
		['Micronesia', 12],
		['Grenada', 12],
		['Uzbekistan', 12],
		['Martinique', 11],
		['Laos', 10],
		['Sierra Leone', 10],
		['Tonga', 10],
		['Guadeloupe', 9],
		['Mauritania', 9],
		['Faroe Islands', 8],
		['Gabon', 8],
		['Sint Maarten', 6],
		['Timor-Leste', 6],
		['Burundi', 5],
		['Cook Islands', 5],
		['French Guiana', 5],
		['Niger', 5],
		['Togo', 5],
		['Burkina Faso', 4],
		['Papua New Guinea', 4],
		['Palau', 4],
		['Cuba', 3],
		['Djibouti', 3],
		['Solomon Islands', 3],
		['Somalia', 3],
		['Vanuatu', 3],
		['Cape Verde', 2],
		['Greenland', 2],
		['Lesotho', 2],
		['Swaziland', 2],
		['Turkmenistan', 2],
		['Tuvalu', 2],
		['American Samoa', 1],
		['Kiribati', 1],
		['Liberia', 1],
		['Saint Martin', 1],
		['Mali', 1],
		['New Caledonia', 1],
		['Saint Helena', 1],
		['Tajikistan', 1]
	]);

	var options = {
		title: '' + domain_visits + '',
		colorAxis:
		{
			minValue: 0,
			colors: ['#D1EDF8', '#098FC8']
		},
		legend:
		{
			numberFormat: '#,###'
		}
	};

	var formatter = new google.visualization.NumberFormat(
	{
		groupingSymbol: ' ',
		fractionDigits: 0
	});
	formatter.format(data, 1); // Apply formatter to second column

	var chart = new google.visualization.GeoChart(document.getElementById('geoMap'));
	chart.draw(data, options);
};

function drawPieGeo()
{
	var data = google.visualization.arrayToDataTable([
		['Pays', 'Visites'],
		['United States', 710295],
		['Canada', 79054],
		['United Kingdom', 71119],
		['Philippines', 47436],
		['Malaysia', 24587],
		['Australia', 20552],
		['Singapore', 14806],
		['Norway', 9795],
		['India', 9759],
		['Indonesia', 9601],
		['France', 9413],
		['Netherlands', 8483],
		['Germany', 7903],
		['Mexico', 6803],
		['Sweden', 6272],
		['Ireland', 6039],
		['New Zealand', 4404],
		['Belgium', 3791],
		['United Arab Emirates', 3539],
		['Saudi Arabia', 3180],
		['Egypt', 2582],
		['Puerto Rico', 1951],
		['Romania', 1926],
		['South Africa', 1912],
		['Denmark', 1842],
		['Thailand', 1552],
		['Hong Kong', 1549],
		['Poland', 1480],
		['Jamaica', 1339],
		['Spain', 1296],
		['Japan', 1236],
		['Israel', 1231],
		['Malta', 1225],
		['Pakistan', 1196],
		['Austria', 1189],
		['Guam', 1122],
		['Portugal', 1100],
		['Lebanon', 1085],
		['Trinidad and Tobago', 945],
		['Italy', 933],
		['Switzerland', 927],
		['Brazil', 842],
		['Mauritius', 841],
		['Finland', 822],
		['Serbia', 749],
		['Cyprus', 721],
		['Greece', 714],
		['Morocco', 623],
		['Qatar', 600],
		['Nigeria', 592],
		['Colombia', 590],
		['Dominican Republic', 584],
		['Peru', 576],
		['Kuwait', 574],
		['Suriname', 570],
		['Algeria', 558],
		['China', 538],
		['Hungary', 530],
		['Vietnam', 528],
		['Albania', 518],
		['Bahamas', 509],
		['Slovenia', 481],
		['Turkey', 464],
		['Belize', 458],
		['Jordan', 457],
		['Lithuania', 454],
		['U.S. Virgin Islands', 428],
		['El Salvador', 422],
		['Honduras', 414],
		['Guatemala', 410],
		['Chile', 406],
		['Panama', 405],
		['Brunei', 402],
		['Croatia', 402],
		['Bulgaria', 393],
		['Argentina', 375],
		['Bahrain', 375],
		['Sri Lanka', 369],
		['Venezuela', 364],
		['Northern Mariana Islands', 361],
		['Ecuador', 352],
		['Kenya', 332],
		['Bangladesh', 312],
		['Russia', 311],
		['Nepal', 299],
		['Tunisia', 282],
		['Guyana', 281],
		['Estonia', 271],
		['Nicaragua', 265],
		['Macau', 263],
		['Costa Rica', 236],
		['South Korea', 235],
		['Botswana', 227],
		['Bosnia and Herzegovina', 226],
		['Turks and Caicos Islands', 221],
		['Aruba', 201],
		['Luxembourg', 200],
		['Ukraine', 198],
		['Cambodia', 196],
		['Bermuda', 192],
		['Barbados', 191],
		['Iceland', 191],
		['Czech Republic', 178],
		['Maldives', 169],
		['Oman', 169],
		['Tanzania', 166],
		['Georgia', 157],
		['Uruguay', 155],
		['Jersey', 151],
		['Bolivia', 146],
		['Montenegro', 137],
		['Ghana', 136],
		['Slovakia', 134],
		['Iraq', 132],
		['Dominica', 126],
		['Syria', 125],
		['Saint Vincent and the Grenadines', 125],
		['Cayman Islands', 123],
		['Saint Lucia', 119],
		['Namibia', 116],
		['Netherlands Antilles', 113],
		['Taiwan', 109],
		['Côte d’Ivoire', 96],
		['Latvia', 93],
		['Senegal', 87],
		['Kosovo', 87],
		['Zimbabwe', 81],
		['Paraguay', 78],
		['Mozambique', 74],
		['Belarus', 72],
		['British Virgin Islands', 71],
		['Fiji', 69],
		['Guernsey', 66],
		['Ethiopia', 63],
		['Sudan', 59],
		['Uganda', 59],
		['Isle of Man', 57],
		['Antigua and Barbuda', 56],
		['Moldova', 55],
		['Mongolia', 55],
		['Haiti', 53],
		['Iran', 53],
		['Cameroon', 52],
		['Malawi', 46],
		['Gibraltar', 45],
		['Armenia', 42],
		['Marshall Islands', 42],
		['Zambia', 42],
		['Palestine', 41],
		['Seychelles', 38],
		['Libya', 35],
		['Azerbaijan', 32],
		['Bhutan', 32],
		['Yemen', 31],
		['Saint Kitts and Nevis', 29],
		['Gambia', 26],
		['Rwanda', 26],
		['Curaçao', 23],
		['French Polynesia', 23],
		['Andorra', 20],
		['Réunion', 20],
		['Monaco', 18],
		['Madagascar', 17],
		['Angola', 16],
		['Åland Islands', 16],
		['Kazakhstan', 16],
		['Anguilla', 15],
		['Micronesia', 12],
		['Grenada', 12],
		['Uzbekistan', 12],
		['Martinique', 11],
		['Laos', 10],
		['Sierra Leone', 10],
		['Tonga', 10],
		['Guadeloupe', 9],
		['Mauritania', 9],
		['Faroe Islands', 8],
		['Gabon', 8],
		['Sint Maarten', 6],
		['Timor-Leste', 6],
		['Burundi', 5],
		['Cook Islands', 5],
		['French Guiana', 5],
		['Niger', 5],
		['Togo', 5],
		['Burkina Faso', 4],
		['Papua New Guinea', 4],
		['Palau', 4],
		['Cuba', 3],
		['Djibouti', 3],
		['Solomon Islands', 3],
		['Somalia', 3],
		['Vanuatu', 3],
		['Cape Verde', 2],
		['Greenland', 2],
		['Lesotho', 2],
		['Swaziland', 2],
		['Turkmenistan', 2],
		['Tuvalu', 2],
		['American Samoa', 1],
		['Kiribati', 1],
		['Liberia', 1],
		['Saint Martin', 1],
		['Mali', 1],
		['New Caledonia', 1],
		['Saint Helena', 1],
		['Tajikistan', 1]
	]);

	var options = {
		title: '' + domain_visits + ''
	};

	var formatter = new google.visualization.NumberFormat(
	{
		groupingSymbol: ' ',
		fractionDigits: 0
	});
	formatter.format(data, 1);

	var chart = new google.visualization.PieChart(document.getElementById('pieGeo'));
	chart.draw(data, options);
}

function drawSexUsers()
{
	var data = google.visualization.arrayToDataTable([
		['Sexe', 'Nombre'],
		['Hommes', 2963],
		['Femmes', 33805],
	]);

	var options = {
		title: '' + sex_users + '',
		colors: ['#3366CC', '#EF7BB8']
	};

	var formatter = new google.visualization.NumberFormat(
	{
		groupingSymbol: ' ',
		fractionDigits: 0
	});
	formatter.format(data, 1);

	var chart = new google.visualization.PieChart(document.getElementById('sexUsers'));
	chart.draw(data, options);
}

google.setOnLoadCallback(drawMapGeo);
google.setOnLoadCallback(drawPieGeo);
google.setOnLoadCallback(drawSexUsers);