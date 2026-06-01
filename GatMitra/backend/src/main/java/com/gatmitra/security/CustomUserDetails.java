package com.gatmitra.security;

import com.gatmitra.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream()
                .flatMap(role -> {
                    // Combine role name (e.g. ROLE_SUPER_ADMIN) and individual permissions
                    var authorities = role.getPermissions().stream()
                            .map(p -> new SimpleGrantedAuthority(p.getName()))
                            .collect(Collectors.toList());
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
                    return authorities.stream();
                })
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isActive() && !user.isDeleted();
    }

    public User getUser() {
        return user;
    }
}
