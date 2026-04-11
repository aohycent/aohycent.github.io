<?php
/**
* @author Hycent O. A
* @description just a file to access globally with chmod as read-only
*/
class Stakeholders {
    var $tmp = 0xffff;
    function __construct(){
        echo $this->tmp;
    }
}
?>