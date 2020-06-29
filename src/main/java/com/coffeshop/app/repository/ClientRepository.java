package com.coffeshop.app.repository;

import com.coffeshop.app.domain.Client;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByPhoneNumber(String phoneNumber);

}
