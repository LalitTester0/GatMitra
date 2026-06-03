package com.gatmitra.security;

import com.gatmitra.member.entity.Member;
import com.gatmitra.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private User user;
    private Member member;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public CustomUserDetails(Member member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (user != null) {
            var authorities = user.getRole().getPermissions().stream()
                    .map(p -> new SimpleGrantedAuthority(p.getPermissionCode()))
                    .collect(Collectors.toList());
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleCode()));
            return authorities;
        } else if (member != null) {
            return List.of(new SimpleGrantedAuthority("ROLE_MEMBER"));
        }
        return List.of();
    }

    @Override
    public String getPassword() {
        return ""; // Password will be OTP, handled differently
    }

    @Override
    public String getUsername() {
        return user != null ? user.getMobileNumber() : member.getMobileNumber();
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
        if (user != null) {
            return "ACTIVE".equals(user.getStatus()) && !user.isDeleted();
        } else if (member != null) {
            return "ACTIVE".equals(member.getStatus()) && !member.isDeleted();
        }
        return false;
    }

    public User getUser() {
        return user;
    }

    public Member getMember() {
        return member;
    }
}
