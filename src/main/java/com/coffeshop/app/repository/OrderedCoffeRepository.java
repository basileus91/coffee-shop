package com.coffeshop.app.repository;

import com.coffeshop.app.domain.OrderedCoffe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the OrderedCoffe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderedCoffeRepository extends JpaRepository<OrderedCoffe, Long> {

    List<OrderedCoffe> findAllByOrderId (String orderId);

}
