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
 * A CoffeAmount.
 */
@Entity
@Table(name = "coffe_amount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CoffeAmount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "available_amount")
    private Long availableAmount;

    @Column(name = "sokd_amount")
    private Long sokdAmount;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "coffeAmount")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Coffe> coffes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("coffeAmounts")
    private Coffe coffe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAvailableAmount() {
        return availableAmount;
    }

    public CoffeAmount availableAmount(Long availableAmount) {
        this.availableAmount = availableAmount;
        return this;
    }

    public void setAvailableAmount(Long availableAmount) {
        this.availableAmount = availableAmount;
    }

    public Long getSokdAmount() {
        return sokdAmount;
    }

    public CoffeAmount sokdAmount(Long sokdAmount) {
        this.sokdAmount = sokdAmount;
        return this;
    }

    public void setSokdAmount(Long sokdAmount) {
        this.sokdAmount = sokdAmount;
    }

    public Set<Coffe> getCoffes() {
        return coffes;
    }

    public CoffeAmount coffes(Set<Coffe> coffes) {
        this.coffes = coffes;
        return this;
    }

    public CoffeAmount addCoffe(Coffe coffe) {
        this.coffes.add(coffe);
        coffe.setCoffeAmount(this);
        return this;
    }

    public CoffeAmount removeCoffe(Coffe coffe) {
        this.coffes.remove(coffe);
        coffe.setCoffeAmount(null);
        return this;
    }

    public void setCoffes(Set<Coffe> coffes) {
        this.coffes = coffes;
    }

    public Coffe getCoffe() {
        return coffe;
    }

    public CoffeAmount coffe(Coffe coffe) {
        this.coffe = coffe;
        return this;
    }

    public void setCoffe(Coffe coffe) {
        this.coffe = coffe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CoffeAmount)) {
            return false;
        }
        return id != null && id.equals(((CoffeAmount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CoffeAmount{" +
            "id=" + getId() +
            ", availableAmount=" + getAvailableAmount() +
            ", sokdAmount=" + getSokdAmount() +
            "}";
    }
}
