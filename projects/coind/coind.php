<?php 
include "mailer.php";
	if(!defined('GENESIS_VERSION'))
		define('GENESIS_VERSION','0000000000000000000000000000000000000000000000020000000000000000');
	if(!defined('FINAL_VERSION'))
		define('FINAL_VERSION','000000000000000000000000000000000000000000000003ffffffffffffffff');

class coind {
	var $target = "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so";
	var $start = GENESIS_VERSION;
	var $stop = FINAL_VERSION;
	var $log_debug;
	var $log_unspent;
	var $log_pid;
	var $report_to;
	var $resp;
	var $print_logs;

	function __construct($print_debugs = null){
		if ($print_debugs) {
			$this->print_logs = true; 
		}

		$this->log_debug = "logs/debug.txt";
		$this->log_unspent = "logs/unspent.txt";
		$this->log_version = "logs/version.txt";
		$this->log_pid = "logs/pid.txt"; //Last successful try
		$this->report_to = "hycentonline@gmail.com";
		$this->start = self::get_start();
		$this->stop = self::get_stop();
	}

	protected function get_start(){
		return $this->start;
	}
	protected function get_stop(){
		return $this->stop;
	}

	function format_seconds($seconds) {
	  	$seconds = intval($seconds);
	    $years = floor($seconds/(3600*24*365));
	    $months = floor($seconds/(3600*24*31));
	    $weeks = floor($seconds/(3600*24*7));
	    $days = floor($seconds/(3600*24));
	    $hours = floor($seconds / 3600);
	    $minutes = floor($seconds / 60);
	    
	    if ($years > 0) {
	      if ($years == 1) $str = $years." year";
	      else $str = $years." years";
	      $months = $months - 12*$years;
	      if ($months != 1) $str .= " and ".$months." months";
	      else $str .= " and ".$months." month";
	      return $str;
	    }
	    else if ($months > 0) {
	      if ($months == 1) $str = $months." month";
	      else $str = $months." months";
	      $weeks = $weeks - 4*$months;
	      if ($weeks != 1) $str .= " and ".$weeks." weeks";
	      else $str .= " and ".$weeks." week";
	      return $str;
	    }
	    else if ($weeks > 0) {
	      if ($weeks == 1) $str = $weeks." week";
	      else $str = $weeks." weeks";
	      $days = $days - 7*$weeks;
	      if ($days != 1) $str .= " and ".$days." days";
	      else $str .= " and ".$days." day";
	      return $str;
	    }
	    else if ($days > 0) {
	      if ($days == 1) $str = $days." day";
	      else $str = $days." days";
	      $hours = $hours - 24*$days;
	      if ($hours != 1) $str .= " and ".$hours." hours";
	      else $str .= " and ".$hours." hour";
	      return $str;
	    }
	    else if ($hours > 0) {
	      $str = "";
	      if ($hours != 1) $str .= $hours." hours";
	      else $str .= $hours." hour";
	      $remainder_min = round(($seconds - (3600*$hours))/60);
	      if ($remainder_min > 0 && $hours < 3) {
	        $str .= " and ".$remainder_min." ";
	        if ($remainder_min == '1') $str .= "minute";
	        else $str .= "minutes";
	      }
	      return $str;
	    }
	    else if ($minutes > 0) {
	      $remainder_sec = $seconds-$minutes*60;
	      $str = "";
	      if ($minutes != 1) $str .= $minutes." minutes";
	      else $str .= $minutes." minute";
	      if ($remainder_sec > 0 && $minutes < 10) $str .= " and ".$remainder_sec." seconds";
	      return $str;
	    }
	    else {
	      if ($seconds != 1) return $seconds." seconds";
	      else return $seconds." second";
	    }
	}

	public function pad($param,$len,$direction=null)
    {
       	switch ($direction) {
    		case 'right':
    			$p = STR_PAD_RIGHT;
    			break;

    		case 'left':
    				$p = STR_PAD_LEFT;
    				break;

    		case 'both':
    			$p = STR_PAD_BOTH;
    			break;
    		
    		default:
    			$p = STR_PAD_LEFT;
    			break;
    	}

    	$r = str_pad(strval($param),$len,"0",$p);
    	return $r;
    }

	function set_start($int){
		$this->start = $int;
	}

	function set_stop($int){
		$this->stop = $int;
	}
	function set_target($addr){
		$this->target = $addr;
	}

	function setup_env(){
		if (!is_dir("logs")) {
			mkdir("logs");
		}
		if (!is_file($this->log_debug)) {
			$this->new_file($this->log_debug);
			$this->log_data($this->log_debug, $this->log_debug." created.");
		}
		if (!is_file($this->log_unspent)) {
			$this->new_file($this->log_unspent);
			$this->log_data($this->log_debug, $this->log_unspent." created.");
		}
		if(!is_file($this->log_pid)){
			$this->new_file($this->log_pid);
			$this->log_data($this->log_debug, $this->log_pid." created.");
		}
	}

	function log_err($err){
		$this->resp .= nl2br($err);
	}

	function get_response(){
		return $this->resp;
	}


	function new_file($name){
		if (file_put_contents($name, "")) {
			return true;
		}
		return false;
	}

	function get_last_id(){
		$a = file_get_contents($this->log_pid);
		if (empty($a)) {
			return GENESIS_VERSION;
		}
		return $a;
	}

	function set_last_id($last){
		if (file_put_contents($this->log_pid, $last)) {
			return true;
		}
		return false;
	}

	function get_last_chainwork(){
		$a = file_get_contents($this->log_version);
		if (empty($a)) {
			if($this->set_last_chainwork()){
				return $this->get_last_chainwork();
			}
		}
		return $a;
	}

	function set_last_chainwork(){
		$b = $this->get_last_id();
		$lcw = $this->get_last_chainwork();
		$a = bcadd($b, hexdec('ffffffff'));
		if($lcw<=$b){
			if (!file_put_contents($this->log_version, $a)) {
				return false;
			}
		}
		return true;
	}

	function log_data($log, $data){
		if($this->print_logs){ $this->log_err($data);}
		@file_put_contents($log,$data."\n", FILE_APPEND | LOCK_EX);
		return true;
	}

	function try_target($addr){
		if ($addr===$this->target) {
			$this->log_data($this->log_unspent, $addr);
			$this->set_result($addr);
			$this->report_found();
			return true;
		}else{
			$a = $addr." missed target, ".$_SERVER['REMOTE_ADDR'];
			$this->log_err($a);
			return false;
		}
	}

	function report_found(){
		$mailer = new PHPMailer();
        
        $mailer->CharSet = 'utf-8';
        
        $mailer->AddAddress($this->report_to, "Hycent");
        
        $mailer->Subject = "Target Found";

        $mailer->From = "no-reply@coind.ott";         
        
        $mailer->Body ="Target address ".$this->target." found.\r\n".
        "SE: ".$this->get_result("SE")."\r\n".
        "PK: ".$this->get_result("PK")."\r\n";
        
        if(!$mailer->Send())
        {
            return false;
        }
        return true;
	}

	function set_result($result){
		if (file_put_contents("logs/found.txt", $result)) {
			return true;
		}
		return false;
	}

	function get_result($type = null){
		if (!is_file("logs/found.txt")) {
			$a = "cli: get_result() -Response: failed \n";
			$this->log_data($this->log_debug, $a);
			$this->new_file("logs/found.txt");
		}

		if (is_null($type)) {
			if ($a = file_get_contents("logs/found.txt")) {
				return $a;
			}
		}
		return false;
	}

	function to_fixed(string $number, int $precision = 8){
        $number = bcmul($number, (string) pow(10, $precision));

        return bcdiv($number, (string) pow(10, $precision), $precision);
    }

    function best_block(){
    	$a = $this->get_last_id();
    	if (is_numeric($a)) {
    		$a=dechex($a);
    	}
    	return $this->pad($a,64);
    }

}