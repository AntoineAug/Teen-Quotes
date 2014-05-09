<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class EmailSpecialEventCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'emailevent:send';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Send an email to all users for a special event.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		$event = $this->argument('event');
		if (is_null($event) OR !in_array($event, ['christmas', 'newyear']))
			$this->error('Wrong type of event!');

		$users = User::get();
		$users->each(function($user) use($event)
		{
			// Log this info
			$this->info("Sending email for event ".$event." to ".$user->login." - ".$user->email);
			Log::info("Sending email for event ".$event." to ".$user->login." - ".$user->email);

			$data = array();
			$data['user'] = $user->toArray();

			// Send the email to the user
			Mail::send('emails.events.'.$event, $data, function($m) use($user, $event)
			{
				$m->to($user->email, $user->login)->subject(Lang::get('email.event'.ucfirst($event).'SubjectEmail'));
			});
		});
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('event', InputArgument::REQUIRED, 'The name of the event: christmas|newyear'),
		);
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array();
	}
}