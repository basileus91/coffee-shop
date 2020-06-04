package com.coffeshop.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Coffe.
 */
@Entity
@Table(name = "coffe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Coffe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "price")
    private Double price;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @OneToOne
    @JoinColumn()
    private Category region;

    @OneToMany(mappedBy = "coffe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CoffeAmount> coffeAmounts = new HashSet<>();

    /**
     * Another side of the same relationship
     */
    @ApiModelProperty(value = "Another side of the same relationship")
    @ManyToOne
    @JsonIgnoreProperties("coffes")
    private CoffeAmount coffeAmount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Coffe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountryName() {
        return countryName;
    }

    public Coffe countryName(String countryName) {
        this.countryName = countryName;
        return this;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getDescription() {
        return description;
    }

    public Coffe description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Coffe quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public Coffe price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Coffe photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Coffe photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Category getRegion() {
        return region;
    }

    public Coffe region(Category category) {
        this.region = category;
        return this;
    }

    public void setRegion(Category category) {
        this.region = category;
    }

    public Set<CoffeAmount> getCoffeAmounts() {
        return coffeAmounts;
    }

    public Coffe coffeAmounts(Set<CoffeAmount> coffeAmounts) {
        this.coffeAmounts = coffeAmounts;
        return this;
    }

    public Coffe addCoffeAmount(CoffeAmount coffeAmount) {
        this.coffeAmounts.add(coffeAmount);
        coffeAmount.setCoffe(this);
        return this;
    }

    public Coffe removeCoffeAmount(CoffeAmount coffeAmount) {
        this.coffeAmounts.remove(coffeAmount);
        coffeAmount.setCoffe(null);
        return this;
    }

    public void setCoffeAmounts(Set<CoffeAmount> coffeAmounts) {
        this.coffeAmounts = coffeAmounts;
    }

    public CoffeAmount getCoffeAmount() {
        return coffeAmount;
    }

    public Coffe coffeAmount(CoffeAmount coffeAmount) {
        this.coffeAmount = coffeAmount;
        return this;
    }

    public void setCoffeAmount(CoffeAmount coffeAmount) {
        this.coffeAmount = coffeAmount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coffe)) {
            return false;
        }
        return id != null && id.equals(((Coffe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Coffe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", countryName='" + getCountryName() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
