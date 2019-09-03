<?php

namespace Model;

class DataObject {

    protected $data;

    public function _contruct(array $data = [])
    {
        $this->data = $data;
    }

    protected function _get($key) {
        return $this->data[$key];
    }

    protected function _set($key, $value) {
        $this->data[$key] = $value;
    }
}