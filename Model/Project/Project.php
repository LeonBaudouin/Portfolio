<?php

namespace Model\Project;

class Project extends \Model\Entity\AbstractEntity implements ProjectInterface
{

    public function getName()
    {
        return $this->_get(self::NAME);
    }

    public function setName($value)
    {
        $this->_set(self::NAME, $value);
    }

    public function getSkills()
    {
        return $this->_get(self::SKILLS);
    }

    public function setSkills($value)
    {
        $this->_set(self::SKILLS, $value);
    }

    public function getType()
    {
        return $this->_get(self::TYPE);
    }

    public function setType($value)
    {
        $this->_set(self::TYPE, $value);
    }

    public function getDesktopGalleryImage()
    {
        return $this->_get(self::DESKTOP_GALLERY_IMAGE);
    }

    public function setDesktopGalleryImage($value)
    {
        $this->_set(self::DESKTOP_GALLERY_IMAGE, $value);
    }

    public function getPhoneGalleryImage()
    {
        return $this->_get(self::PHONE_GALLERY_IMAGE);
    }

    public function setPhoneGalleryImage($value)
    {
        $this->_set(self::PHONE_GALLERY_IMAGE, $value);
    }

    public function getDesktopFeaturedImage()
    {
        return $this->_get(self::DESKTOP_FEATURED_IMAGE);
    }

    public function setDesktopFeaturedImage($value)
    {
        $this->_set(self::DESKTOP_FEATURED_IMAGE, $value);
    }

    public function getPhoneFeaturedImage()
    {
        return $this->_get(self::PHONE_FEATURED_IMAGE);
    }

    public function setPhoneFeaturedImage($value)
    {
        $this->_set(self::PHONE_FEATURED_IMAGE, $value);
    }

    public function getUrl()
    {
        return $this->_get(self::URL);
    }

    public function setUrl($value)
    {
        $this->_set(self::URL, $value);
    }

    public function getDescription()
    {
        return $this->_get(self::DESCRIPTION);
    }

    public function setDescription($value)
    {
        $this->_set(self::DESCRIPTION, $value);
    }

    public function getIsFeatured()
    {
        return $this->_get(self::IS_FEATURED);
    }

    public function setIsFeatured($value)
    {
        $this->_set(self::IS_FEATURED, $value);
    }

    public function getIsLab()
    {
        return $this->_get(self::IS_LAB);
    }

    public function setIsLab($value)
    {
        $this->_set(self::IS_LAB, $value);
    }

    public function getIsVisible()
    {
        return $this->_get(self::IS_VISIBLE);
    }

    public function setIsVisible($value)
    {
        $this->_set(self::IS_VISIBLE, $value);
    }
}
