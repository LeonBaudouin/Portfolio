<?php

namespace Model\Project;

interface ProjectInterface extends \Model\Entity\EntityInterface {

    const NAME = 'name';
    const SKILLS = 'skills';
    const TYPE = 'type';
    const GALLERY_IMAGE = 'gallery_image';
    const HIGH_RES_FEATURED_IMAGE = 'high_res_featured_image';
    const LOW_RES_FEATURED_IMAGE = 'low_res_featured_image';
    const URL = 'url';
    const DESCRIPTION = 'description';

    public function getName();
    public function setName($value);
    
    public function getSkills();
    public function setSkills($value);
    
    public function getType();
    public function setType($value);
    
    public function getGalleryImage();
    public function setGalleryImage($value);
    
    public function getHighResFeaturedImage();
    public function setHighResFeaturedImage($value);
    
    public function getLowResFeaturedImage();
    public function setLowResFeaturedImage($value);
    
    public function getUrl();
    public function setUrl($value);
    
    public function getDescription();
    public function setDescription($value);

}