package com.coffeshop.app.repository;

import com.coffeshop.app.domain.Coffe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Coffe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoffeRepository extends JpaRepository<Coffe, Long> {

}
