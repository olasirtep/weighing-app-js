module.exports = {
generateMainPage : function (current, total) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Vaakasovellus</title>
		<!-- CSS only -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
		<style>
		a {
			text-decoration:none;
			color:inherit;
		}
		a:visited {
			text-decoration:none;
			color:inherit;
		}
		a:hover {
			text-decoration:none;
			color:inherit;
		}
		</style>
	</head>
	<body>
		<div class="container" style="border: 1px solid black; max-width: 800px;">
		<div class="row">
		<div class="col">
		<div class="row">
			<button class="btn"><a href="/">Punnitus</a></button>
		</div>
		</div>
		<div class="col">
		<div class="row">
			<button class="btn btn-secondary"><a href="/history">Punnitushistoria</a></button>
		</div>
		</div>
		</div>
		<div class="text-center row my-5">
		<h1 class="display-1"><span id="currentWeight">${current}</span> kg</h1>
		<p class="h3">&sum;: <span id="currentTotal">${total}</span> kg</p>
		</div>

		<div class="row">
		<div class="col">
		<div class="row p-4">
		<button class="btn btn-lg btn-success text-center" onclick="weighButtonClicked()">Punnitse</button>
		</div>
		</div>
		<div class="col">
		<div class="row p-4">
		<button class="btn btn-lg btn-danger text-center" onclick="resetButtonClicked()">Nollaa</button>
		</div>
		</div>
		</div>
		</div>

		<!-- JavaScript Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script>
			// Handle weigh button click
			function weighButtonClicked() {
				$.getJSON('/weigh', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}

			// Handle reset button click
			function resetButtonClicked() {
				$.getJSON('/reset', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}
		</script>
		</body>
	</html>
	`;
},
generateHistoryPage: function(data) {
	let weightHistory = '';
	for (let x of data) {
		weightHistory += `
		<div class="row px-5">
		<div class="col" style="text-align:right;">
		${x['datetime']}
		</div>
		<div class="col" style="text-align:right;">
		${x['weight']} kg
		</div>
		</div>`;
	}
	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Vaakasovellus</title>
		<!-- CSS only -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
		<style>
		a {
			text-decoration:none;
			color:inherit;
		}
		a:visited {
			text-decoration:none;
			color:inherit;
		}
		a:hover {
			text-decoration:none;
			color:inherit;
		}
		</style>
	</head>
	<body>
		<div class="container" style="border: 1px solid black; max-width: 800px;">
		<div class="row">
		<div class="col">
		<div class="row">
			<button class="btn btn-secondary"><a href="/">Punnitus</a></button>
		</div>
		</div>
		<div class="col">
		<div class="row">
			<button class="btn"><a href="/history">Punnitushistoria</a></button>
		</div>
		</div>
		</div>
		
		<div class="row my-5 px-5" id="weightHistory">
		${weightHistory}
		</div>

		</div>

		<!-- JavaScript Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script>
			// Handle weigh button click
			function weighButtonClicked() {
				$.getJSON('/weigh', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}

			// Handle reset button click
			function resetButtonClicked() {
				$.getJSON('/reset', function(data) {
					$("#currentWeight").text(data['currentWeight']);
					$("#currentTotal").text(data['currentTotal']);
				});
			}
		</script>
		</body>
	</html>
	`;
}
};
