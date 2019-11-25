<?php

namespace Model\Project;

interface ProjectInterface extends \Model\Entity\EntityInterface
{

    const NAME = 'name';
    const SKILLS = 'skills';
    const TYPE = 'type';
    const DESKTOP_GALLERY_IMAGE = 'desktop_gallery_image';
    const PHONE_GALLERY_IMAGE = 'phone_gallery_image';
    const DESKTOP_FEATURED_IMAGE = 'desktop_featured_image';
    const PHONE_FEATURED_IMAGE = 'phone_featured_image';
    const URL = 'url';
    const DESCRIPTION = 'description';
    const IS_FEATURED = 'is_featured';
    const IS_LAB = 'is_lab';
    const IS_VISIBLE = 'is_visible';


    public function getName();
    public function setName($value);

    public function getSkills();
    public function setSkills($value);

    public function getType();
    public function setType($value);

    public function getDesktopGalleryImage();
    public function setDesktopGalleryImage($value);

    public function getPhoneGalleryImage();
    public function setPhoneGalleryImage($value);

    public function getDesktopFeaturedImage();
    public function setDesktopFeaturedImage($value);

    public function getPhoneFeaturedImage();
    public function setPhoneFeaturedImage($value);

    public function getUrl();
    public function setUrl($value);

    public function getDescription();
    public function setDescription($value);

    public function getIsFeatured();
    public function setIsFeatured($value);

    public function getIsLab();
    public function setIsLab($value);
}
