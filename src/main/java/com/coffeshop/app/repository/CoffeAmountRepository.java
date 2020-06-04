package com.coffeshop.app.repository;

import com.coffeshop.app.domain.CoffeAmount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CoffeAmount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoffeAmountRepository extends JpaRepository<CoffeAmount, Long> {

}
